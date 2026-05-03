// entities/base-entity.ts
export abstract class BaseEntity {
  protected _isActive: boolean;
  protected readonly _createdAt: Date;
  private readonly _uncommittedEvents: any[] = []; // Chứa Domain Events

  constructor(
    public readonly id: string,
    isActive: boolean,
    createdAt: Date,
  ) {
    this._isActive = isActive;
    this._createdAt = createdAt;
  }

  // Cung cấp các method tương tự NestJS AggregateRoot nhưng thuần TS
  publish(event: any) {
    this._uncommittedEvents.push(event);
  }

  getUncommittedEvents(): any[] {
    return this._uncommittedEvents;
  }

  commit() {
    this._uncommittedEvents.length = 0;
  }

  get isActive(): boolean {
    return this._isActive;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
}
