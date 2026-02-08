import type { BasePayload, CollectionSlug, DataFromCollectionSlug } from 'payload';

export const getFieldFromUid = async <T extends DataFromCollectionSlug<CollectionSlug>>({
  payload,
  collectionName,
  uidFieldName,
  uid,
}: {
  payload: BasePayload;
  collectionName: CollectionSlug;
  uidFieldName: string;
  uid: string;
}): Promise<T> => {
  const result = await payload.find({
    collection: collectionName,
    where: { [uidFieldName]: { equals: uid } },
    limit: 1,
  });

  if (result.docs.length === 0) {
    throw new Error(`Uid not found in collection '${collectionName}': ${uid}`);
  }

  return result.docs[0] as T;
};

export const safeFieldId = (value: any): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'object' && value !== null && 'id' in value) {
    return (value as { id: number }).id;
  }
  throw new Error(`[safeFieldId] Invalid field value: ${value}`);
};
