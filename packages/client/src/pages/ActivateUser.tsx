import { FunctionComponent, useCallback, useState } from "react";
import { Box, Group, Title, NumberInput } from "@mantine/core";

export const ActivateUser: FunctionComponent = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = useCallback<
    (part: number) => (value: number | "") => void
  >(
    (part) =>
      function (value) {
        setCode((prev) => {
          const newCode = [...prev];
          newCode[part] = value ? String(value) : "";
          return [...newCode];
        });
      },
    []
  );

  return (
    <Box>
      <Title>Enter your activation code</Title>
      <form>
        <Group grow noWrap spacing="sm">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Box key={i * 2}>
              <NumberInput
                min={0}
                max={9}
                required
                type="number"
                value={Number(code[i])}
                id={`code-part-${i + 1}`}
                onChange={handleCodeChange(i)}
                name={`code-part-${i + 1}-input`}
              />
            </Box>
          ))}
        </Group>
      </form>
    </Box>
  );
};
