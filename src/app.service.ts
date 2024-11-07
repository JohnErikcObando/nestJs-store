import { Injectable, Inject } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    console.log('tasks', this.tasks);

    return `Hello World! ${this.apikey}`;
  }
}
