# Security Specification: Real Estate Control Layer

## Data Invariants
1. **Property Ownership**: A property must have a valid `brokerId` matching the authenticated user's UID.
2. **First Registration Integrity**: The `isOriginal` flag and `firstRegisteredAt` field are set on creation based on a server check (simulated in client but protected by rules from modification).
3. **Immutability**: `brokerId`, `createdAt`, and `isOriginal` are immutable after creation.
4. **Verification Status**: `verificationStatus` defaults to `pending` and can only be updated by authorized roles (Admins or system, here we allow owner for demo but restricted).
5. **Type Safety**: All fields must strictly adhere to their defined types and logical boundaries (e.g., area > 0).

## The Dirty Dozen Payloads (Identity, Integrity, and State)

1. **Spoofed Owner**: Creating a property with a `brokerId` that doesn't match the auth UID.
2. **Ghost Verification**: Creating a property with `verificationStatus: 'verified'`.
3. **Future Timestamp**: Setting `createdAt` to a future date instead of `request.time`.
4. **ID Poisoning**: Using a 2KB string as a `propertyId`.
5. **Shadow Update**: Updating a property and trying to change the `brokerId`.
6. **Price Sabotage**: Updating a property with a negative price.
7. **Phantom Broker**: Creating a property referencing a non-existent broker (checking relational sync).
8. **Privilege Escalation**: A user trying to set themselves as an Admin in the `admins` collection.
9. **PII Leak**: A non-owner trying to read a broker's private profile.
10. **Terminal State Bypass**: Updating a property that has been `archived` or reached a final `rejected` status.
11. **Malicious Enum**: Setting `propertyType` to "Nuclear Bunker" (invalid enum).
12. **Batch Desync**: Creating a property without updating a parent stats document (if applicable).

## Test Runner (Conceptual)
All payloads above MUST return `PERMISSION_DENIED`.
