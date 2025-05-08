import { Button } from "../../components/button/button.tmpl";
import { Heading } from "../../components/heading/heading.tmpl";
import { Input } from "../../components/input/input.tmpl";

type ProfileInfo = {
  name: string;
};

type InputEditorItem = {
  id: string;
  type: "email" | "text" | "tel";
  label: string;
  placeholder: string;
};

export type ProfileData = {
  headingData: Heading[];
  profileData: ProfileInfo;
  inputEditorData: Input[];
  buttonData: Button[];
};
