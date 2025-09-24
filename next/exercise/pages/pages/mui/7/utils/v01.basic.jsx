import {Panel} from "@/lib/components/tailwind/panel/v01";
import {TagFieldGroupSingle} from "@/lib/components/mui/TagFields";

import {
  autocompleteClasses, Autocomplete, Box, Button, Checkbox, Chip,
  ListSubheader, Stack, Tabs, Tab, TextField, Typography, useTheme
} from '@mui/material';


import {v4 as genUUID} from 'uuid';
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {getWeight} from "@/lib/utils";

export function Mui7Basic() {
  const [weight1, setWeight1] = useState('');
  const [weight2, setWeight2] = useState('');
  const [weight, setWeight] = useState(getWeight(weight1, weight2));

  const [uuid, setUuid] = useState(genUUID());

  useEffect(() => {
    setWeight(getWeight(weight1, weight2));
  }, [weight1, weight2]);

  return (<>
    <Panel title={'Weight'}>
      <Stack spacing={2} direction="row" className={'mt-2'} flexWrap={'wrap'} useFlexGap>
        <TextField id="weight1" label="Weight1" variant="outlined" value={weight1} size="small"
                   sx={{width: '16ch'}}
                   slotProps={{
                     inputLabel: {shrink: true}, // ✅ label 始终显示
                   }}
                   onChange={(e) => {
                     setWeight1(e.target.value);
                   }}/>
        <TextField id="weight2" label="Weight2" variant="outlined" value={weight2} size="small"
                   sx={{width: '16ch'}}
                   slotProps={{
                     inputLabel: {shrink: true}, // ✅ label 始终显示
                   }}
                   onChange={(e) => {
                     setWeight2(e.target.value);
                   }}/>
        <TextField id="weight" label="Weight" variant="outlined" value={weight} size="small"
                   sx={{width: '16ch'}}
                   slotProps={{
                     inputLabel: {shrink: true}, // ✅ label 始终显示
                   }}/>
        <Button variant="contained" color="success"
                onClick={() => {
                  setWeight(getWeight(weight1, weight2));
                }}>
          Calc
        </Button>
        <Button variant="contained" color="primary"
                onClick={() => {
                  setWeight(getWeight(weight, ''));
                }}>
          Prev
        </Button>
        <Button variant="contained" color="primary"
                onClick={() => {
                  setWeight(getWeight('', weight));
                }}>
          Next
        </Button>
      </Stack>
    </Panel>

    <Panel title={'UUID'}>
      <Stack spacing={2} direction="row" className={'mt-2'} flexWrap={'wrap'} useFlexGap>
        <TextField id="uuid" label="uuid" variant="outlined" value={uuid} size="small"
                   sx={{width: '36ch'}}
                   slotProps={{
                     inputLabel: {shrink: true}, // ✅ label 始终显示
                   }}/>
        <Button variant="contained" color="primary"
                onClick={() => {
                  setUuid(genUUID())
                }}>
          Refresh
        </Button>
      </Stack>
    </Panel>

  </>)
}