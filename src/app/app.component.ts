import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @Input()
  device: Device;

  protocol: typeof Protocol = Protocol;

  syncForm: AbstractControl;

  constructor() {}

  ngOnInit(): void {
    this.device = {
      name: 'asd',
      type: Protocol.OPC_UA,
      password: 'sfas',
      _embedded: {
        gateway: null,
      },
    };
  }
}

// #region model
export type Device = DeviceOpcua | DeviceModbusTcp | DeviceBacnet;

interface DeviceBase {
  name: string;

  _embedded: {
    gateway: null;
  };
}

// OPC_UA
export interface DeviceOpcua extends DeviceBase {
  type: Protocol.OPC_UA;
  timestampSource?: ConnectionSource;
  securityMode?: SecurityMode;
  authentication?: AuthenticationType;
  username?: string;
  password?: string;
}

// MODBUS_TCP
export interface DeviceModbusTcp extends DeviceBase {
  type: Protocol.MODBUS_TCP;
  holdConnection?: boolean;
  slaveId?: number;
  byteOrder?: ByteOrder;
  bcdLength?: number;
  timestampRegister?: number;
}

// BACNET
export interface DeviceBacnet extends DeviceBase {
  type: Protocol.BACNET;
}

export enum Protocol {
  OPC_UA = 'OPC_UA',
  MODBUS_TCP = 'MODBUS_TCP',
  BACNET = 'BACNET',
}

export enum ConnectionStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  ERROR = 'ERROR',
}

export enum SecurityMode {
  NONE = 'NONE',
  SIGN = 'SIGN',
  SIGN_AND_ENCRYPT = 'SIGN_AND_ENCRYPT',
}

export enum AuthenticationType {
  ANONYMOUS = 'ANONYMOUS',
  CREDENTIALS = 'CREDENTIALS',
  CERTIFICATE = 'CERTIFICATE',
}

export enum ConnectionSource {
  DEVICE = 'DEVICE',
  GATEWAY = 'GATEWAY',
  PLATFORM = 'PLATFORM',
}

export enum RetryStrategy {
  REGULAR_INTERVALS = 'REGULAR_INTERVALS',
  INCREMENTAL_INTERVALS = 'INCREMENTAL_INTERVALS',
  EXPONENTIAL_BACK_OFF = 'EXPONENTIAL_BACK-OFF',
  RANDOMIZATION = 'RANDOMIZATION',
}

export enum ByteOrder {
  LITTLE_ENDIAN = 'LITTLE_ENDIAN',
  BIG_ENDIAN = 'BIG_ENDIAN',
  BIG_PLUS_LITTLE = 'BIG_PLUS_LITTLE',
  NO_SWAP = 'NO_SWAP',
  BCD_BIG_ENDIAN = 'BCD_BIG_ENDIAN',
  BCD_LITTLE_ENDIAN = 'BCD_LITTLE_ENDIAN',
}

//#endregion
