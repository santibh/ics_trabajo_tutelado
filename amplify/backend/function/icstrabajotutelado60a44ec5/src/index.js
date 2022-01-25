const aws = require("aws-sdk");
const ses = new aws.SES({ region: "eu-west-1" });

exports.handler = async function (event) {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === "INSERT") {
      //pull off items from stream
      const commentContent = streamedItem.dynamodb.NewImage.content.S;
      //const commentOwner = streamedItem.dynamodb.NewImage.owner.S;
      const epochCommentDate =
        streamedItem.dynamodb.ApproximateCreationDateTime;
      var commentDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
      commentDate.setUTCSeconds(epochCommentDate);

      var params = {
        Destination: {
          ToAddresses: ["santibadosb14@gmail.com"],
        },
        Message: {
          Body: {
            Text: {
              Data: `Han respondido a tu post el día ${commentDate
                .toISOString()
                .replace(/T/, " ") // replace T with a space
                .replace(/\..+/, "")}: \n <<${commentContent}>> `,
            },
          },

          Subject: { Data: `¡Tu post está teniendo reacciones!` },
        },
        Source: "santiagotrabajotutelado@gmail.com",
      };

      return ses.sendEmail(params).promise();
    }
  }
};