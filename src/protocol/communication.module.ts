// communication.module.ts

import { Module, Logger } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager'; // Import CACHE_MANAGER

import { CommunicationService } from './communication.service';

@Module({
  imports: [CacheModule.register()], // Register CacheModule with default options

  providers: [
    CommunicationService,
    Logger,
    // Add CACHE_MANAGER as a provider
    {
      provide: CACHE_MANAGER,
      useFactory: () => {}, // You may need to provide a factory function based on your cache manager setup
    },
  ],
  exports: [CommunicationService, Logger], // Export both CommunicationService and Logger
})
export class CommunicationModule {}
