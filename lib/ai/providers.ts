import { createOpenAI } from "@ai-sdk/openai";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";

/**
 * Server-only provider registry.
 *
 * Every credential stays in environment variables. The browser receives model
 * metadata only; it never receives an API key. Providers that expose an
 * OpenAI-compatible endpoint can be configured with AI_PROVIDER_CONFIG_JSON.
 */
type ProviderConfig = {
  apiKey?: string;
  baseURL?: string;
  headers?: Record<string, string>;
};

function readProviderConfig(): Record<string, ProviderConfig> {
  const raw = process.env.AI_PROVIDER_CONFIG_JSON;
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed as Record<string, ProviderConfig>;
  } catch {
    console.warn("AI_PROVIDER_CONFIG_JSON is not valid JSON; using defaults.");
    return {};
  }
}

const configuredProviders = readProviderConfig();
const providerCache = new Map<string, ReturnType<typeof createOpenAI>>();

function getProvider(name: string) {
  const cached = providerCache.get(name);
  if (cached) {
    return cached;
  }

  const config = configuredProviders[name] ?? {};
  const isDefault = name === "openai";
  const apiKey =
    config.apiKey ??
    (isDefault
      ? (process.env.OPENAI_API_KEY ?? process.env.AI_GATEWAY_API_KEY)
      : undefined);
  const baseURL =
    config.baseURL ??
    (isDefault
      ? (process.env.OPENAI_BASE_URL ??
        (process.env.AI_GATEWAY_API_KEY
          ? "https://ai-gateway.vercel.sh/v1"
          : undefined))
      : undefined);

  if (!apiKey && !process.env.AI_GATEWAY_API_KEY) {
    throw new Error(
      "No AI credential configured. Set OPENAI_API_KEY or AI_PROVIDER_CONFIG_JSON."
    );
  }

  const provider = createOpenAI({
    ...(apiKey ? { apiKey } : {}),
    ...(baseURL ? { baseURL } : {}),
    ...(config.headers ? { headers: config.headers } : {}),
  });
  providerCache.set(name, provider);
  return provider;
}

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        chatModel,
        titleModel: mockTitleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": mockTitleModel,
        },
      });
    })()
  : null;

function parseModelId(modelId: string) {
  const [providerName, ...modelParts] = modelId.split("/");
  return {
    modelName: modelParts.join("/") || providerName,
    providerName: modelParts.length > 0 ? providerName : "openai",
  };
}

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  const { modelName, providerName } = parseModelId(modelId);
  return getProvider(providerName)(modelName);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return getLanguageModel(process.env.AI_TITLE_MODEL ?? "openai/gpt-4o-mini");
}

export function getConfiguredProviderNames() {
  return Object.keys(configuredProviders);
}
