import { Flex, Grid } from 'antd';
import { ConversionResult } from './conversionResult/conversionResult';
import { EnterData } from './enterData/enterData';

const { useBreakpoint } = Grid;

export const ConvertionPanel = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Flex vertical={isMobile} gap={30}>
      <EnterData />
      <ConversionResult />
    </Flex>
  );
};
