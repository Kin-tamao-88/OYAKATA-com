/**
 * 写真素材の差し替え口。
 * 新しい写真が用意できたら、ここのimportだけを差し替える(生成用の指示は docs/corporate-redesign/image-prompts.md)。
 * 現在はリポジトリ内の既存素材を割り当てている。
 */
import logo from "../../../assets/images/logos/logo-mark2.webp";
import fvPhoto from "../../../assets/images/about/intro-sunset.webp";
import missionPhoto from "../../../assets/images/hero/hero-new-background.webp";
import service1 from "../../../assets/images/OC05/hero-pc.webp";
import service2 from "../../../assets/images/about/approach-meeting.webp";
import housesPhoto from "../../../assets/images/contractors/fv-background.webp";
import strengthPhoto from "../../../assets/images/OC06/reason-industry-marketing.webp";

export const IMG = {
  logo,
  fv: fvPhoto,
  mission: missionPhoto,
  service1,
  service2,
  service3: housesPhoto,
  strength: strengthPhoto,
  partners: housesPhoto,
} as const;
