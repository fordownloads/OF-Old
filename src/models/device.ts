export interface IDevice {
    codename: string;
    modelname: string;
    fullname: string;
    oem?: string;
    maintained?: number;
    maintainer?: { name: string }
}

export interface IDeviceGroup {
    oem: string;
    devices: IDevice[];
}
