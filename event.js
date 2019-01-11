const { EventHubClient, EventPosition } = require('@azure/event-hubs');

async function main() {
  const onError = (err) => {
    console.log("An error occurred on the receiver ", err);
  };

  const onMessage = (eventData) => {
    console.log("=========================================")
    console.log("sequenceNumber: ", eventData.sequenceNumber);
    console.log("Data: ", eventData.body);
  };

  const client = await EventHubClient.createFromIotHubConnectionString(process.env.IOTHUB_CONNECTION_STRING);
  const hubInfo = await client.getHubRuntimeInformation();
  console.log(hubInfo);
  const receiveHandler = client.receive(process.env.PARTITION, onMessage, onError, { eventPosition: EventPosition.fromSequenceNumber(parseInt(process.env.START_SEQUENCE_NUMBER)) });

  //await client.close();
}

main().catch((err) => {
  console.log(err);
});
