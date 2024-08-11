import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'; // Import the admin SDK
import { app } from 'firebase-admin'; // Import the app type

@Injectable()
export class FirebaseRepository {
  #db: admin.database.Database;
  #ref: admin.database.Reference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#db = firebaseApp.database();
    this.#ref = this.#db.ref('ecos');
  }

  // Example method to set data
  async setData(path: string, data: any): Promise<void> {
    await this.#ref.child(path).set(data);
  }

  // Example method to get data
  async getData(path: string): Promise<any> {
    const snapshot = await this.#ref.child(path).once('value');
    return snapshot.val();
  }

  // Example method to update data
  async updateData(path: string, data: any): Promise<void> {
    await this.#ref.child(path).update(data);
  }

  // Example method to delete data
  async deleteData(path: string): Promise<void> {
    await this.#ref.child(path).remove();
  }
}
