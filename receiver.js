const { EventHubConsumerClient, earliestEventPosition, latestEventPosition } = require("@azure/event-hubs");
const config = require('./config');

async function main() {
  const client = new EventHubConsumerClient(
    '$Default',
    config.eventHubNamespace, 
    config.eventHub
  );

  // In this sample, we use the position of earliest available event to start from
  // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
  const subscriptionOptions = {
    startPosition: latestEventPosition
  };

  const subscription = client.subscribe(
    {
      processEvents: async (events, context) => {
        // event processing code goes here
        console.log("Events >>>> ", events[0].body);
      },
      processError: async (err, context) => {
        // error reporting/handling code here
        console.log("Events >>>> ", err, "\nContext >>>> ", context);
      }
    },
    subscriptionOptions
  );

  // Wait for a few seconds to receive events before closing
  setTimeout(async () => {
    await subscription.close();
    await client.close();
    console.log(`Exiting sample`);
  }, 2000 * 1000);
}

main();