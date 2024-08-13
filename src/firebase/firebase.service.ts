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

  async userDetailRealtime(observable: string, user_id: string) {
    const rtdbKey = `${observable}/${user_id}`;
    const checkStatus: boolean = await this.firebaseRepository.getData(rtdbKey);
    const value = checkStatus ? !checkStatus : true;
    this.firebaseRepository.setData(rtdbKey, value);
  }

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
}
