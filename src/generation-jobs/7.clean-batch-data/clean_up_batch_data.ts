/// this method will clean up the _generation_requests collection and _batch_data collection
/// On Completion of the batch processing

import { getDbInstance } from "../../app";

export async function cleanUpBatchData({
  batch_id,
  requestIdentifiers,
}: {
  batch_id: string;
  requestIdentifiers: any[];
}): Promise<void> {
  try {
    const database = getDbInstance();
    const generationDataCollection = database.collection(
      "_generation_requests"
    );
    const batchDataCollection = database.collection("_batch_data");
    await generationDataCollection.deleteMany({
      $or: requestIdentifiers,
    });
    await batchDataCollection.deleteMany({ status: "completed" });
  } catch (error) {
    console.error("Error occurred while cleaning up the batch data:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to clean up batch data: ${errorMessage}`);
  }
}
