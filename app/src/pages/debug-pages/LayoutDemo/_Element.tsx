import { TristanLayout } from "../../../design-system/ui-components/layout";

export const Element: React.FC = () => {
  return (
    <TristanLayout
      top={<div>Top</div>}
      left={<div>Left</div>}
      right={<div>Right</div>}
      main={<div>Main</div>}
    />
  );
};
