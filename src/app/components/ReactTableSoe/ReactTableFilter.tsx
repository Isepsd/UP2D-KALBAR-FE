import React, { useMemo, useCallback } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import debounce from 'lodash/debounce';
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter';
import styled from 'styled-components';

import ReactTableSelectOptions from './ReactTableSelectOptions'

const Input = styled.input`
  background-color: var(--white);
  color: var(--black);
  border-radius: .35rem;
  width: 100%;
`;
const Select = styled.select`
  background-color: var(--white);
  color: var(--black);
  border-radius: .35rem;
`;

export const DefaultColumnFilter = ({
  column: { filterValue, setFilter, Header }, //preFilteredRows
}: any) => {
  const searchHandler = (event: any) => {
    setFilter(event.target.value || undefined);
  };

  const debouncedSearchHandler = useCallback(debounce(searchHandler, 500), []);

  // const count = preFilteredRows.length;
  return (
    <Input
      className='border-0 px-2'
      defaultValue={filterValue || ''}
      onChange={debouncedSearchHandler}
      placeholder={`Cari ${Header}`} // ${count} 
    />
  );
};

// This is a custom filter UI for selecting
// a unique option from a list
export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id, filterOutside, filterType }
}: any) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  
  const options = useMemo(() => {
    const options: any = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add({label: row.values[id], value: row.values[id]});
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <Select className='px-2 border-0'
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=''>All</option>
      {
        filterOutside ? <ReactTableSelectOptions type={filterType} /> : (
          <>
            {options.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )
      }
    </Select>
  );
};

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export const SliderColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) => {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row: any) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div className='d-flex'>
      <input
        type='range'
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <OverlayTrigger
        delay={{ show: 50, hide: 250 }}
        overlay={<Tooltip id='hover-tooltip'>Reset</Tooltip>}
      >
        <button
          className='btn btn-primary btn-sm ms-2 font-weight-bold'
          onClick={() => setFilter(undefined)}
        >
          <i className='fa-solid fa-clock-rotate-left'></i>
        </button>
      </OverlayTrigger>
    </div>
  );
};

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export const NumberRangeColumnFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}: any) => {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row: any) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  );
};

export const fuzzyTextFilterFn = (rows: any, id: any, filterValue: any) => {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
};

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

export const filterGreaterThan = (rows: any, id: any, filterValue: any) => {
  return rows.filter((row: any) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
};

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number';
