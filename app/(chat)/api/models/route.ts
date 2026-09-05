import {
  chatModels,
  getAllGatewayModels,
  getCapabilities,
  isDemo,
} from "@/lib/ai/models";

export async function GET() {
  const headers = {
    "Cache-Control": "private, max-age=300, stale-while-revalidate=600",
  };

  const curatedCapabilities = await getCapabilities();
  const configuredModels = chatModels.map((model) => ({
    ...model,
    capabilities: curatedCapabilities[model.id] ?? {
      reasoning: Boolean(model.reasoningEffort),
      tools: true,
      vision: false,
    },
  }));

  if (isDemo) {
    const models = await getAllGatewayModels();
    const capabilities = Object.fromEntries(
      models.map((model) => [
        model.id,
        curatedCapabilities[model.id] ?? model.capabilities,
      ])
    );
    return Response.json({ capabilities, models }, { headers });
  }

  return Response.json(
    { capabilities: curatedCapabilities, models: configuredModels },
    { headers }
  );
}
