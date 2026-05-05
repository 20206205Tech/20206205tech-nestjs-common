import { BaseVersion } from '../value-objects/base-version';
import { BaseEntity } from './base-entity';

export abstract class BaseVersionAggregateRoot extends BaseEntity {
  public version: BaseVersion;

  constructor(
    id: string,
    version?: number | BaseVersion,
    isActive: boolean = true,
    createdAt: Date = new Date(),
  ) {
    super(id, isActive, createdAt);
    this.version =
      version instanceof BaseVersion ? version : new BaseVersion(version ?? 1);
  }

  incrementVersion() {
    this.version = new BaseVersion(this.version.value + 1);
  }
}
