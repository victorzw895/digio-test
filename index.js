const fs = require("fs");

const regex =
  /(?<ip_address>[^a-zA-Z]*?) (?<remote_log_name>.*?) (?<user_id>.*?) \[(?<date>.*?) (?<timezone>[^a-zA-Z]*?)\] \"(?<request_method>[A-Z]*?) (?<path>.*?)(?<request_version>HTTP\/[^a-zA-Z].*)?\" (?<status>[0-9]*?) (?<length>[0-9-].*?) \"(?<referrer>.*?)\" \"(?<user_agent>.*?)\"/;

const parseLogByLine = () => {
  const results = [];

  const logFile = fs.readFileSync("sample-data.log", "utf-8");
  const logsArray = logFile.split("\n");
  logsArray.forEach((line) => {
    // LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-agent}i\"" combined
    // %h = ip address
    // %l = hyphen -> requested piece of information not available
    // %u = userid
    // %t = time
    // \"%r\" = Request Method, Requested Source, Client Protocol
    // %>s = status code
    // %b = size of object returned to client
    // \"%{Referer}i\" = HTTP request header
    // \"%{User-agent}i\" = Request header, client browser information

    const parsedLine = line.match(regex);

    if (parsedLine) {
      results.push(parsedLine.groups);
    }
  });

  return results;
};

const groupBy = (collection, property) => {
  const result = collection.reduce((logGroup, log) => {
    logGroup[log[property]] = [...(logGroup[log[property]] || []), log];
    return logGroup;
  }, {});

  return result;
};

const filterUniqueAddress = (parsedLogs) => {
  let result = [];
  if (parsedLogs) {
    const uniqueAddress = groupBy(parsedLogs, "ip_address");
    result = Object.keys(uniqueAddress);
  }
  return result.length;
};

const getMostVisitedURLs = (parsedLogs) => {
  let result = [];
  if (parsedLogs) {
    // get and split url by paths
    const urlPaths = parsedLogs.map((log) => log.path.trim().split("/"));
    // filter out empty paths and http protocol and domain name, keep base path
    let urlPath = urlPaths.map(
      (paths) =>
        paths.filter(
          (path) => path && !path.includes("http:") && !path.includes(".")
        )[0]
    );
    // remove undefined values
    urlPath = urlPath.filter((path) => path);
    urlPath.sort();

    let commonPaths = {};

    urlPath.map((path) => {
      if (path in commonPaths) {
        commonPaths[path] += 1;
      } else {
        commonPaths[path] = 1;
      }
    });

    Object.entries(commonPaths).map((path) => {
      result.push(path);
    });
  }

  result.sort(function (a, b) {
    return b[1] - a[1];
  });

  return result.slice(0, 3).map((pathCount) => pathCount[0]);
};

const getMostActiveIPAddresses = (parsedLogs) => {
  let result = [];
  if (parsedLogs) {
    const uniqueAddress = groupBy(parsedLogs, "ip_address");
    const activeIPAddresses = Object.values(uniqueAddress).filter(
      (uniqueAddressCollection) => {
        return uniqueAddressCollection.filter((log) => log.status === "200");
      }
    );
    result = activeIPAddresses.sort(function (a, b) {
      return b.length - a.length;
    });
  }

  //   console.log(
  //     result.map((logs) => {
  //       return logs.length;
  //     })
  //   );

  return result.slice(0, 3).map((logs) => {
    return logs[0].ip_address;
  });
};

let parsedLogs = parseLogByLine();
const uniqueAddresses = filterUniqueAddress(parsedLogs);
const mostVisitedURLs = getMostVisitedURLs(parsedLogs);
const mostActiveIPAddresses = getMostActiveIPAddresses(parsedLogs);

console.log("uniqueAddresses", uniqueAddresses);
console.log("3 most visited urls", mostVisitedURLs);
console.log("3 most active ip addresses", mostActiveIPAddresses);

module.exports = {
  parseLogByLine,
  uniqueAddresses,
  mostVisitedURLs,
  mostActiveIPAddresses,
};
