/**
 * 写真・装飾素材の差し替え口。
 * 完成モックの写真素材が納品されたら、ここのimportだけを差し替える。
 * 現在はリポジトリ内の既存素材を「仮」として割り当てている(モックの写真とは別物)。
 */
import logo from "../../../assets/images/logos/logo-mark2.webp";
import brush from "../../../assets/images/ui/brush-yellow.webp";
import fvPhoto from "../../../assets/images/about/intro-sunset.webp";
import missionPhoto from "../../../assets/images/hero/hero-new-background.webp";
import service1 from "../../../assets/images/OC05/hero-pc.webp";
import service2 from "../../../assets/images/about/approach-meeting.webp";
import housesPhoto from "../../../assets/images/contractors/fv-background.webp";
import contactPhoto from "../../../assets/images/OC05/band-pc.webp";

export const IMG = {
  logo,
  brush,
  fv: fvPhoto,
  mission: missionPhoto,
  service1,
  service2,
  service3: housesPhoto,
  strength: missionPhoto,
  partners: housesPhoto,
  contact: contactPhoto,
} as const;
