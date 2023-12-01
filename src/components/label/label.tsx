import { SE } from "@shipengine/alchemy";
import { styles } from "./label.styles";
import { Icon, IconSize } from "@packlink/giger";
import { IconNames } from "@packlink/giger-theme";
import copy from "copy-to-clipboard";
import { getServiceCodeFriendlyName } from "@src/utils";

export type LabelProps = {
  label: SE.Label;
  handleClick: (shipmentId: string) => void;
};

export const Label = ({ label, handleClick }: LabelProps) => {
  const carrierCodeOverrides = {
    stamps_com: "stamps_com_wl",
    usps: "stamps_com_wl",
  };

  const overrideCarrierCodes = (carrierCode: string) => {
    return (
      carrierCodeOverrides[carrierCode as keyof typeof carrierCodeOverrides] ||
      carrierCode
    );
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const totalCost = label.shipmentCost.amount + label.insuranceCost?.amount;

  return (
    <article
      css={styles.article}
      onClick={() => {
        handleClick(label.shipmentId);
      }}
    >
      <section css={styles.section}>
        <img
          alt={label.carrierCode}
          css={styles.image}
          src={`https://logos.shipstation.com/ipaas/carriers/${overrideCarrierCodes(
            label.carrierCode
          )}/icon.svg`}
        />

        <div>
          <div
            css={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {getServiceCodeFriendlyName(label.serviceCode)}
          </div>
          <div
            css={{ display: "flex", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              copy(label.trackingNumber);
            }}
          >
            <div
              css={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "112px",
                fontWeight: "normal",
              }}
            >
              {label.trackingNumber}
            </div>
            <Icon name={IconNames.COPY} size={IconSize.SIZE_SMALL}></Icon>
          </div>
        </div>

        <div>{formatDate(label.shipDate)}</div>

        <div>${totalCost.toFixed(2)}</div>
      </section>
    </article>
  );
};
