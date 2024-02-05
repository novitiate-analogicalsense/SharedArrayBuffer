onmessage = (ev) => {
  const { sab, id } = ev.data;
  const i32 = new Int32Array(sab);
  var val = Atomics.load(i32, 0);
  while (val != id - 1) {
    console.log('waiting for worker: ', id);
    Atomics.wait(i32, 0, val);
    val = Atomics.load(i32, 0);
  }

  setTimeout(() => {
    console.log(`notifying for worker: ${id}`)
    Atomics.store(i32, 0, id);
    Atomics.notify(i32, 0);
  }, 5000);
};
