'use strict';

const fs = require('fs');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

module.exports = function (Xhtmltojson) {
  let xml = fs.readFileSync('mock/Bed_Rail_Restraint.html', 'utf8');
  let doc = new dom().parseFromString(xml);

  /*construct the initial json object string */
  let jsonString = {
    message: {
      content: {
        metaData: []
      }
    }
  };

  let metaDataArray = xpath.select("/html/head/meta", doc);
  for (let metaData of metaDataArray) {
    let metaDataDom = new dom().parseFromString(metaData.toString());
    let metaDataName = xpath.select("/meta/@name", metaDataDom).value;
    console.log(`metaDataName: ${metaDataName}`);

      let metaDataObject = { name: metaDataName, content: xpath.select("/meta/@content", metaDataDom).value };
      jsonString.message.content.metaData.push(metaDataObject);
  }

  console.log(JSON.stringify(jsonString));
  /* construct the metadata here */


  // let nodes = xpath.select("/html/body/div/div[@class='topic nested1']", doc);
  // console.log("###########################################################################");
  // for(let value of nodes)
  // {
  //   console.log("***************************************************************************");
  //   let newDom = new dom().parseFromString(value.toString());
  //   let subNodes = xpath.select("/div/@id", newDom);
  //   console.log(subNodes.toString());
  //   console.log("***************************************************************************");
  // }
  console.log("###########################################################################");
};
