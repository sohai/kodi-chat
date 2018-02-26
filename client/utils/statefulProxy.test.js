import statefulProxy from './statefulProxy';

const expectThrowMustBeStarted = instance => {
  expect(() => {
    console.warn('should not be run:', instance.proxy.name);
  }).toThrow('`stefulProxy` instance must be started before');
};

describe('statefulProxy', () => {
  const fakeFactory1 = jest.fn(async () => ({ name: 'factory_1' }));
  const fakeFactory2 = jest.fn(async () => ({ name: 'factory_2' }));

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('return right structure', async () => {
    const fake = statefulProxy(fakeFactory1);
    await fake.start();
    expect(fake).toMatchSnapshot();
  });
  it('factory run only once', async () => {
    const fake = statefulProxy(fakeFactory1);
    await fake.start();
    await fake.start();
    await fake.start();
    expect(fakeFactory1).toHaveBeenCalledTimes(1);
  });

  it('throw error if not started', async () => {
    const fake = statefulProxy(fakeFactory1);
    expectThrowMustBeStarted(fake);
  });
  it('throw error if stoped after start', async () => {
    const fake = statefulProxy(fakeFactory1);
    await fake.start();
    await fake.stop();
    expectThrowMustBeStarted(fake);
  });
  it('restarts and starts after stop should call factory', async () => {
    const fake = statefulProxy(fakeFactory1);
    await fake.start(); // first call
    await fake.stop();
    await fake.start(); // second call
    await fake.restart(); // third call
    expect(fakeFactory1).toHaveBeenCalledTimes(3);
  });
  it('factories from diffrent proxy instances dont intefers', async () => {
    const fake1 = statefulProxy(fakeFactory1);
    const fake2 = statefulProxy(fakeFactory2);
    await fake2.start();
    await fake1.start();
    await fake1.restart();
    await fake1.restart();
    expect(fakeFactory2).toHaveBeenCalledTimes(1);
    expect(fakeFactory1).toHaveBeenCalledTimes(3);
  });
  describe('hooks', () => {
    const createFake = () => {
      const fake = statefulProxy(fakeFactory1);
      const onStops = [
        jest.fn(async () => null),
        jest.fn(async () => null),
        jest.fn(async () => null)
      ];
      const onStarts = [
        jest.fn(async () => null),
        jest.fn(async () => null),
        jest.fn(async () => null)
      ];
      onStarts.forEach(f => fake.onStart(f));
      onStops.forEach(f => fake.onStop(f));
      return { fake, onStarts, onStops };
    };

    it('during start all onStart callback called', async () => {
      const { fake, onStarts, onStops } = createFake(fakeFactory1);
      await fake.start();
      await fake.start();
      onStarts.forEach(f => {
        expect(f).toHaveBeenCalledTimes(1);
      });
      onStops.forEach(f => {
        expect(f).toHaveBeenCalledTimes(0);
      });
    });
    it('during stop all stop callback called', async () => {
      const { fake, onStarts, onStops } = createFake(fakeFactory1);
      await fake.start();
      jest.clearAllMocks();
      await fake.stop();
      onStarts.forEach(f => {
        expect(f).toHaveBeenCalledTimes(0);
      });
      onStops.forEach(f => {
        expect(f).toHaveBeenCalledTimes(1);
      });
    });

    it('during restart all callback called', async () => {
      const { fake, onStarts, onStops } = createFake(fakeFactory1);
      await fake.start();
      jest.clearAllMocks();
      await fake.restart();
      onStarts.forEach(f => {
        expect(f).toHaveBeenCalledTimes(1);
      });
      onStops.forEach(f => {
        expect(f).toHaveBeenCalledTimes(1);
      });
    });
  });
});
