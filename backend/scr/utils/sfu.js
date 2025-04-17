import { createWorker } from "mediasoup";

let worker;
const initMediasoup = async () => {
  worker = await createWorker();
  console.log("Worker iniciado");
};

initMediasoup();
