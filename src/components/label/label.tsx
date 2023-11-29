import { SE } from "@shipengine/alchemy";
import { styles } from "./label.styles";

export type LabelProps = {
  label: SE.Label;
  handleClick: (shipmentId: string) => void;
  //   carrier: string;
  //   shippingAmount: string;
  //   shipDate: string;
  //   trackingNumber: string;
};

// TODO: Style each label to look like Rate Card
// TODO: Get data in correct shape / format
// TODO: Total Cost
// TODO: Hover State
// TODO: Selected State?
// TODO: OnClick: open ViewShipment
// TODO: Make tracking number copyable
// TODO: ViewShipment Slide in from right
// TODO: Close ViewShipment Button
// TODO: Clear Shipment State on Close

export const Label = ({
  label,
  handleClick,
}: //   carrier,
//   shippingAmount,
//   shipDate,
//   trackingNumber,
LabelProps) => {
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

  const serviceCodeOverrides = {
    usps_first_class_mail: "First Class Mail",
    usps_priority_mail: "Priority Mail",
    usps_priority_mail_express: "Priority Mail Express",
    usps_media_mail: "USPS Media Mail",
    usps_parcel_select_ground: "Parcel Select Ground",
    usps_parcel_select: "USPS Parcel Select Ground",
    usps_retail_ground: "Retail Ground",
    usps_first_class_package_service: "First Class Package Service",
    usps_priority_mail_express_international:
      "Priority Mail Express International",
    usps_priority_mail_international: "Priority Mail International",
    usps_first_class_package_international_service:
      "First Class Package International Service",
    usps_priority_mail_international_small_flat_rate_box:
      "Priority Mail International Small Flat Rate Box",
    usps_priority_mail_international_medium_flat_rate_box:
      "Priority Mail International Medium Flat Rate Box",
    usps_priority_mail_international_large_flat_rate_box:
      "Priority Mail International Large Flat Rate Box",
    usps_priority_mail_international_flat_rate_envelope:
      "Priority Mail International Flat Rate Envelope",
    usps_priority_mail_international_legal_flat_rate_envelope:
      "Priority Mail International Legal Flat Rate Envelope",
    usps_priority_mail_international_padded_flat_rate_envelope:
      "Priority Mail International Padded Flat Rate Envelope",
    usps_priority_mail_international_gift_card_flat_rate_envelope:
      "Priority Mail International Gift Card Flat Rate Envelope",
    usps_priority_mail_international_window_flat_rate_envelope:
      "Priority Mail International Window Flat Rate Envelope",
    usps_priority_mail_international_small_flat_rate_envelope:
      "Priority Mail International Small Flat Rate Envelope",
    usps_priority_mail_international_small_flat_rate_boxes:
      "Priority Mail International Small Flat Rate Boxes",
    usps_priority_mail_international_medium_flat_rate_boxes:
      "Priority Mail International Medium Flat Rate Boxes",
    usps_priority_mail_international_large_flat_rate_boxes:
      "Priority Mail International Large Flat Rate Boxes",
    usps_priority_mail_international_legal_flat_rate_boxes:
      "Priority Mail International Legal Flat Rate Boxes",
    usps_priority_mail_international_padded_flat_rate_boxes:
      "Priority Mail International Padded Flat Rate Boxes",
    usps_priority_mail_international_gift_card_flat_rate_boxes:
      "Priority Mail International Gift Card Flat Rate Boxes",
    usps_priority_mail_international_window_flat_rate_boxes:
      "Priority Mail International Window Flat Rate Boxes",
  };
  const getServiceCodeFriendlyName = (serviceCode: string) => {
    return (
      serviceCodeOverrides[serviceCode as keyof typeof serviceCodeOverrides] ||
      serviceCode
    );
  };
  return (
    <article
      css={styles.article}
      role="option"
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
        <div>{getServiceCodeFriendlyName(label.serviceCode)}</div>
        <div>${label.shipmentCost.amount}</div>
        <div>{label.shipDate}</div>
      </section>
    </article>
  );
};
