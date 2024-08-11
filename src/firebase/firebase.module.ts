import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseRepository } from './firebase.repository';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  useFactory: () => {
    const firebaseConfig = {
      type: 'service_account',
      projectId: 'ecos-31d77',
      private_key_id: '535bd5d638b490cfd5034be61e077a7ec8bf3af4',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCgxIN7G3BlAY9\n5ZFL2pB87lVsUno9R8Z6wwrE+0AKyBtTAM4s3tGOQZSMy2T38zDukXUWkKwDOa0q\nlZ11uh/0xfAACI8yZyHSCVUcH34koMSYaLZwTyUBgaw1uCdC88Xcx+hIEIszn6yl\n7kx1F8TSuPYfzrUxhbRg4ZK+j4IpUkMscGhK+Hwu+B46tIjA0xNv52dYFkpwQYHj\np21vYICp6AFi1Z90+q0OAB5oLNCJpp0cUvQdGNMzDitskcaDvu+CrkGlBYD8KyJX\nOqv5vENC20Z+ObT9KOeWo1/rGhAoRivmUtUFcK3L9QE87x0RCvbaUeLggiBBFihi\n10t/BzA3AgMBAAECggEASGDiXnj8LFyK6AxdAQdO3ZYIBls4bkYfhn2+K6c8YOau\nODgkABFXk+I2Rx/GLfd53UQV+DQUNc0H8UEkCvMbwgbHdBO7SSuUK6ZaW7EiTLnf\n/cB1JpxkrkdUz9Z7EZBJL4rZlbtGOQrxAPuHyshx7mFyAEr4JHnWsXgulScsbXgv\nOanOCFqCEtI5HrvYQ6t+IiM0fTdYmOiMozP4BNnHylx5Zh7VLJ5gIzUjJvfN2GFC\no7sRbrNrHK3FQTOdiSTNXquOTUGHpbbUQ29KPVjF/yQG5Yr4py+Ml460MvpjMeP3\nbLr0SBPchmGjckxJYEUjZvhoz6k2BRjeN5pfYy/fTQKBgQDjho6anWPVAIZ1rWYz\nYq+KXNystPB9QgUWwoe3MIUpf2tCyDfmAIoF0/Wea8M09+baieG7qGO2GacnImo+\na8mijcKImn0I+4bvc5ecZ8woLDDelDSqsGLW0ssx2Jn0gpQh/lXgap/1Ok+OEbuQ\nCm9upO2f5c1Sa+ZfCNRuJp6K4wKBgQDa2tORDXyGajgx8fZz5l5t2kskHOU7jhlB\nmSL+zTo+H1dezUEQbZWnlTBbFfV8LfaBQDD5MyAOB2UeDRSnh/2L3Su0v+WWvgC4\nP4LxCU0FlcfuGAg4DVWiFmu5+NaN06xd3olJlSPNoT0gXUBkk/J+Em0ToQ0aUKvW\nuHpuueRhnQKBgESwFZMV2tKuEumpzIXM0CPcPv6grU2TRcgGOESUkE7j2bTSjxWP\nqhtyTt9htw/hmz70i0JE5r1N50mIOTzY+4lodIca5I52qNjXM7kTGO4z0RkQ8wlo\nsJ4cCx3kPy4y0ZelmbVjWyEEVooUTmSA0f08K0SvcpnkWyrrln4eiJRzAoGBALV0\n7im8Zt0DwOgYWGEsRmsKrXaZxq6kWOh80fk1q+7KCaT+xc2bLpQuLFO5VzrI2TO9\nR123OAKpuvs5mUB2jpCippRM700W6H3bmvPC5GuXDpeosVfYJoIn2NXvLeWV9bo2\nwtmRoIfkAkyNRNCfolVJbcryo2yIKpHzjv+zfVo5AoGAfolTEG+JHBiPIbrNDrl1\nUVh3PkQDOD84wKanSOLqITdkFLFkhNMnOZW2BUJHXF+ljEeyYwG1/HkcCWoIhAAt\nZGNZLI85FnIaJ8L4y9A8vulfL+cYoan8m3kXzNbAS/7LjXK867M0HZhLexctzzAc\nFevSthsFjRjG9E09lbxP7sU=\n-----END PRIVATE KEY-----\n',
      client_email:
        'firebase-adminsdk-gtzuc@ecos-31d77.iam.gserviceaccount.com',
      client_id: '100646587580418577366',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gtzuc%40ecos-31d77.iam.gserviceaccount.com',
      universe_domain: 'googleapis.com',
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `ttps://ecos-31d77-default-rtdb.asia-southeast1.firebasedatabase.app`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  providers: [firebaseProvider, FirebaseRepository],
  exports: [FirebaseRepository],
})
export class FirebaseModule {}
