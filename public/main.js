const wasm = {
  loadWasm: async function () {
    const buffer = await this.fetchingWasm("./wasm/add.wasm");
    const module = await this.compileWASM(buffer);
    const instance = await this.instantiateWASM(module);
    console.log(instance.exports);
  },
  fetchingWasm: async function (path) {
    const response = await fetch(path);
    return response.arrayBuffer();
  },
  compileWASM: async function (buffer) {
    return WebAssembly.compile(buffer);
  },
  instantiateWASM: async function (module) {
    const mem = new WebAssembly.Memory({
      initial: 1,
    });
    return WebAssembly.instantiate(module, {
      env: {
        memory: mem,
      },
    });
  },
  createWebWorker: async function () {
    const sab = new SharedArrayBuffer(4);
    const i32a = new Int32Array(sab);
    const ww1 = new Worker('/worker');
    const ww2 = new Worker('/worker');
    const ww3 = new Worker('/worker');
    const ww4 = new Worker('/worker');
    ww1.postMessage({ sab, id: 1 });
    ww2.postMessage({ sab, id: 2 });
    ww3.postMessage({ sab, id: 3 });
    ww4.postMessage({ sab, id: 4 });
    console.log(i32a);
  },
};

globalThis.wasm = wasm;
