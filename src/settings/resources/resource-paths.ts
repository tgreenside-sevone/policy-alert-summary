const OBJECT = {
  allowedValue: true
};

const DEVICE = {
  allowedValue: true,
  next: {
    OBJECT
  }
};

const OBJECT_GROUP = {
  allowedValue: true,
  next: { OBJECT }
};

const DEVICE_GROUP = {
  allowedValue: true,
  next: { DEVICE, OBJECT }
};

const resourcePaths = {
  DEVICE_GROUP,
  DEVICE,
  OBJECT_GROUP
};

export { resourcePaths };
