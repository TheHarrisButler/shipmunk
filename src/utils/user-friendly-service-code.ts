//    TODO: add FedEx, DHL, etc.
//    TODO: we should eventually use the api to get the friendly name
const serviceCodeOverrides = {
    usps_first_class_mail: "USPS First Class Mail",
    usps_priority_mail: "USPS Priority Mail",
    usps_priority_mail_express: "USPS Priority Mail Express",
    usps_media_mail: "USPS Media Mail",
    usps_parcel_select_ground: "USPS Parcel Select Ground",
    usps_parcel_select: "USPS Parcel Select Ground",
    usps_retail_ground: "USPS Retail Ground",
    ups_ground: "UPS Ground",
    ups_next_day_air: "UPS Next Day Air",
    ups_next_day_air_early: "UPS Next Day Air Early",
    ups_next_day_air_saver: "UPS Next Day Air Saver",
    ups_2nd_day_air: "UPS 2nd Day Air",
    ups_2nd_day_air_am: "UPS 2nd Day Air AM",
    ups_3_day_select: "UPS 3 Day Select",
  };
  
  export const getServiceCodeFriendlyName = (serviceCode: string) => {
    return (
      serviceCodeOverrides[serviceCode as keyof typeof serviceCodeOverrides] ||
      serviceCode
    );
  };