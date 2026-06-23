import dns from "dns/promises";

try {
  const records = await dns.resolveSrv(
    "_mongodb._tcp.cluster0.xg8cpld.mongodb.net"
  );

  console.log("SRV Records:");
  console.log(records);
} catch (err) {
  console.error("DNS Error:");
  console.error(err);
}