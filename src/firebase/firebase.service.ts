import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from './firebase.repository';

@Injectable()
export class FirebaseService {
  constructor(private firebaseRepository: FirebaseRepository) {}

  async chatMessageRealtime(observable: string, order_id: string) {
    const rtdbKey = `${observable}/${order_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  // DONE NOTIF
  async userDetailRealtime(observable: string, user_id: string) {
    const rtdbKey = `${observable}/${user_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  // DONE NOTIF
  async driverOrderHeaderForAdminRealtime(observable: string) {
    const rtdbKey = `${observable}/new`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async driverOrderHeaderEachRealtime(observable: string, order_id: string) {
    const rtdbKey = `${observable}/${order_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async customerOrderHeaderForAdminRealtime(observable: string) {
    const rtdbKey = `${observable}/new`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async customerOrderHeaderEachRealtime(
    observable: string,
    customer_order_id: string,
  ) {
    const rtdbKey = `${observable}/${customer_order_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async paymentForAdminRealtime(observable: string) {
    const rtdbKey = `${observable}/new`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async paymentEachRealtime(observable: string, customer_payment_id: string) {
    const rtdbKey = `${observable}/${customer_payment_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async dailyCustomerPickupForAdminRealtime(observable: string) {
    const rtdbKey = `${observable}/new`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async dailyCustomerPickupEachRealtime(observable: string, pickup_id: string) {
    const rtdbKey = `${observable}/${pickup_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async dailyCustomerPickupByDriverIdRealtime(
    observable: string,
    driver_id: string,
  ) {
    const rtdbKey = `${observable}/driver/  ${driver_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async adminTimeBlockForAdminRealtime(observable: string) {
    const rtdbKey = `${observable}/new`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

  async adminTimeBlockEachRealtime(observable: string, time_block_id: string) {
    const rtdbKey = `${observable}/${time_block_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }
}
