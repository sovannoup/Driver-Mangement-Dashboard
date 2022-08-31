import axiosInstance from './interceptors';

export async function fetchSettings() {
    const response = await axiosInstance.get(`settings`);
    return response.data;
  }
  
  export async function editSettings({
    storeName,
    storeOwner,
    storeAddress,
    storeEmail,
    saleEmail,
    storeOpeningTime,
    mainPromotion,
    subscriberText,
    storeComment,
    contactDescription,
  
    categoryProductCount,
    defaultItemsPerPage,
    newProductLength,
    invoicePrefix,
  
    logo,
    icon,
  
    seoMetaTagTitle,
    seoMetaTagDescription,
    seoMetaTagKeyword,
  
    facebookLink,
    twitterLinks,
    instagramLinks,
    youtubeLinks,
  }) {
    const response = await axiosInstance.post(`settings`, {
      store_name: storeName,
      store_owner: storeOwner,
      store_address	: storeAddress,
      store_email: storeEmail,
      sale_email: saleEmail,
      store_opening_time	: storeOpeningTime,
      main_promotion	: mainPromotion,
      subscriber_text: subscriberText,
      store_comment: storeComment,
      contact_description: contactDescription, 
      is_category_product_count: categoryProductCount,
      default_items_per_page: defaultItemsPerPage,
      new_product_length: newProductLength,
      invoice_prefix: invoicePrefix,
      logo: logo,
      icon: icon,
      seo_meta_tag_title: seoMetaTagTitle,
      seo_meta_tag_description: seoMetaTagDescription,
      seo_meta_tag_keyword:	seoMetaTagKeyword,	
      facebook_link: facebookLink,
      twitter_link: twitterLinks,
      instagram_link: instagramLinks,
      youtube_link:	youtubeLinks
    });
    return response.data;
  }