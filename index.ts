import * as Sim from "@nick-iotex/w3bstream-http-client-simulator";
import dotenv from "dotenv";

dotenv.config();

const pubId = process.env.PUB_ID || "";
const pubToken = process.env.PUB_TOKEN || "";
const endpoint = process.env.W3BSTREAM_ENDPOINT || "";

const simulator = new Sim.Simulator(pubId, pubToken, endpoint);
simulator.init();

type TemperatureDataPoint = {
  temperature: number;
  timestamp: number;
};

const dataGenerator = new Sim.DataPointGenerator<TemperatureDataPoint>(() => ({
  temperature: Sim.DataPointGenerator.randomizer(0, 100),
  timestamp: Sim.DataPointGenerator.timestampGenerator(),
}));

simulator.dataPointGenerator = dataGenerator;

simulator.powerOn(5);
