import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

type MenuButtonProps = {
  background?: string
}

export const MenuButton = styled(Button)<MenuButtonProps>(
  ({ background, theme }) => ({
    fontWeight: "bold",
    boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
    borderRadius: "2px",
    textTransform: "capitalize",
    margin: "0 10px",
    padding: "8px 16px",
    color: theme.palette.primary.contrastText,
    background: background || theme.palette.primary.light,
  }),
)
