import { E2eFailTestInitializer } from "@/types";
import { utils } from "@/utils";

export const inputMissingE2eFailTestInitializer: E2eFailTestInitializer = (
	configuredRequester,
	data
) => {
	it(
		utils.createTestMessage.e2eFailTest(
			configuredRequester.getEventName(),
			"INPUT_FIELDS_MISSING"
		),
		async () => {
			const copyData = { ...data };
			const firstKey = Object.keys(copyData).at(0) as string;
			delete (copyData as any)[firstKey];
			await configuredRequester.sendFullFeaturedRequest(
				copyData,
				"INPUT_FIELDS_MISSING",
				{
					shouldFilterRequestData: false,
				}
			);
		}
	);
};
