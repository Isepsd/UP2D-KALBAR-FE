import styled from 'styled-components';

export const ReactTableStyle: any = styled.div`
  display: block;
  max-width: 100%;
  &.tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
  table {
    width: 100%;
    border-spacing: 0;
    font-weight: 400;
    color: var(--black);
    border-bottom: 1px solid var(--black-50);
    background-color: transparent;
    thead {
      tr {
        background-color: var(--black-50);
        th#action:last-child {
          background-color: var(--black-50);
        }
      }
    }
    tbody {
      
      tr {
        border-bottom: 1px solid var(--black-50);
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem 0.75rem;
      border-bottom: none;
      min-width: 5%;
      &#action {
        :last-child {
          border-right: 0;
          position: sticky;
          right: -1px;
          background-color: var(--white);
        }
        :focus-within {
          z-index: 3;
        }
      }
    }

    td#action {
      :last-child {
        padding-left: 0;
        padding-right: 0;
        border-right: 0;
        position: sticky;
        text-align: center;
        right: -1px;
        background-color: var(--black-5);
      }
      :focus-within {
        z-index: 3;
      }
    }
  }
`;
