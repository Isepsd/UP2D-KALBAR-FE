import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { SearchInput } from '@app/styled/sidenav.styled';

export default function WorkspaceSearch() {
  return (
    <SearchInput>
      <InputGroup>
        <InputGroup.Text
          id='search-wsp'
          style={{ background: 'var(--black-5)' }}
        >
          <i className='fa-solid fa-magnifying-glass fa-fw'></i>
        </InputGroup.Text>
        <FormControl
          className='search ps-0'
          placeholder='Cari...'
          aria-label='Cari...'
          aria-describedby='search-wsp'
          style={{ background: 'var(--black-5)', borderLeft: 0 }}
        />
      </InputGroup>
    </SearchInput>
  );
}
