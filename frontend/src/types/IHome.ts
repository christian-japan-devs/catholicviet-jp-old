//
export interface IActicle {
  id: number;
  acticle_title: string;
  acticle_writer: string;
  acticle_date: string;
  acticle_bref: string;
  acticle_content: string;
  acticle_language: string;
  acticle_liked: number;
  acticle_shared: number;
  acticle_image: string;
  acticle_category: string;
}

//
export interface INewFeed {
  id: number;
  nf_title: string;
  nf_type: string;
  nf_image: string;
  nf_brief_content: string;
  nf_content: string;
  nf_language: string;
  nf_date_created: string;
  nf_post_like: number;
  nf_post_share: number;
  nf_post_clicked: number;
}

//
export interface IAbout {
  id: number;
  about_title: string;
  about_image: string;
  about_brief_content: string;
  about_content: string;
  about_language: string;
}

//
export interface IRegister {
  id: number;
  mass_id: number;
  user_status: string;
}

//

