import { Grid, GridChild, Typography } from "@shipengine/giger";
import type { Address } from "@shipengine/alchemy";

type AddressDisplayProps = {
  address: Address;
};

export const AddressDisplay = ({ address }: AddressDisplayProps) => {
  return (
    <Grid data-testid="address-display" noPadding>
      <GridChild colSpan={9}>
        <Typography variant="body2">{address.name}</Typography>
        {address.companyName && (
          <Typography variant="body2">{address.companyName}</Typography>
        )}
        <Typography variant="body2">{address.addressLine1}</Typography>
        {address.addressLine2 && (
          <Typography variant="body2">{address.addressLine2}</Typography>
        )}

        <div>
          <Typography css={{ display: "inline" }} variant="body2">
            {`${address.cityLocality}, ${address.stateProvince} ${address.postalCode}`}
          </Typography>
        </div>

        <Typography variant="body2">{address.countryCode}</Typography>
      </GridChild>
    </Grid>
  );
};
