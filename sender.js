const { EventHubProducerClient } = require("@azure/event-hubs");
const config = require('./config');

async function main() {
  const producerClient = new EventHubProducerClient(config.eventHubNamespace, config.eventHub);

  const eventDataBatch = await producerClient.createBatch();
  let numberOfEventsToSend = 10;

  while (numberOfEventsToSend > 0) {
    let wasAdded = eventDataBatch.tryAdd({ body: `my-event-body ${numberOfEventsToSend}` });
    if (!wasAdded) {
      console.log("Hello");
      break;
    }
    numberOfEventsToSend--;
  }

  // console.log(eventDataBatch);

  await producerClient.sendBatch(eventDataBatch);
  await producerClient.close();
}

main();