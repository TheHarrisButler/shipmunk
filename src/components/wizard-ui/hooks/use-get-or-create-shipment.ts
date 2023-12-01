import { useEffect, useMemo, useState } from "react";

import {
  SalesOrderShipment,
  useCreateShipment,
  useGetShipment,
  useListWarehouses,
} from "@shipengine/alchemy";

import type { Warehouse } from "@shipengine/alchemy";

export const getDefaultWarehouse = (warehouses: Warehouse[]) => {
  return warehouses?.find((w) => w.isDefault) ?? warehouses?.[0];
};

export const useGetOrCreateShipment = (
  onShipmentUpdated:
    | ((shipment: SalesOrderShipment) => void | Promise<void>)
    | undefined,
  shipmentId?: string
) => {
  const { data: warehouses } = useListWarehouses({
    enabled: shipmentId === undefined,
  });

  const [shouldTriggerUpdate, setShouldTriggerUpdate] = useState(false);

  const createShipment = useCreateShipment();

  const createdShipment = useMemo(() => {
    return createShipment.data?.shipments?.[0];
  }, [createShipment.data]);

  useEffect(() => {
    if (
      warehouses &&
      shipmentId === undefined &&
      !createShipment.isLoading &&
      !createdShipment
    ) {
      createShipment.mutate({
        warehouseId: getDefaultWarehouse(warehouses).warehouseId,
      });
      setShouldTriggerUpdate(true);
    }
  }, [warehouses, shipmentId, createShipment, createdShipment]);

  const getShipment = useGetShipment(shipmentId ?? createdShipment?.shipmentId);

  useEffect(() => {
    if (shouldTriggerUpdate && getShipment.data) {
      void onShipmentUpdated?.(getShipment.data);
      setShouldTriggerUpdate(false);
    }
  }, [shouldTriggerUpdate, getShipment]);

  const errors = [
    ...(getShipment.error ?? []),
    ...(createShipment.error ?? []),
  ];

  return {
    errors: errors.length > 0 ? errors : undefined,
    isLoading:
      (!createShipment.isError &&
        createShipment.isIdle &&
        shipmentId === undefined) ||
      getShipment.isLoading ||
      createShipment.isLoading,
    refetchShipment: getShipment.refetch,
    shipment: getShipment.data,
  };
};
