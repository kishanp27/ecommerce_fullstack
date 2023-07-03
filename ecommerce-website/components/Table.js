import { styled } from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: 0.7rem;
  }
  
  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  tbody > tr > td:nth-child(2)>div{
    display: inline;
    border: none;
    padding: 0;
    margin: 0 3px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
