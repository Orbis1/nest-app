import { Test, TestingModule } from '@nestjs/testing';
import {
  AutoExService,
  parsePostSelectedValues,
  transformSelectedValues,
} from './auto-ex.service';
import { iSelectValues } from './dto/post.dto';

// describe('AutoExService', () => {
//   let service: AutoExService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AutoExService],
//     }).compile();

//     service = module.get<AutoExService>(AutoExService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

describe('parsePostSelectedValues', () => {
  it('parsing sample', () => {
    const sample: iSelectValues = {
      AUTP00006748: {
        values: {
          AUTH00106943: 'Андеррайтер ЭРМБ',
        },
      },
      AUTP00009749: {
        key: 'domain',
        values: {
          AUTH00058486: 'SIGMA',
          AUTH00058487: 'ALPHA',
        },
      },
    };

    expect(parsePostSelectedValues(sample)).toEqual([
      {
        parentKey: 'AUTP00006748',
        key: null,
        values: ['Андеррайтер ЭРМБ'],
      },
      {
        parentKey: 'AUTP00009749',
        key: 'domain',
        values: ['SIGMA', 'ALPHA'],
      },
    ]);
  });

  it('parsing role, project, projectRole', () => {
    const sample: iSelectValues = {
      AUTP00006748: {
        key: 'sudirRole',
        values: {
          AUTH00106943: 'VPO-KIB-QS-U',
        },
      },
      AUTP00009749: {
        key: 'project',
        values: {
          AUTH00058486: 'MyBlocks',
        },
      },
      AUTP00009750: {
        key: 'projectRole',
        values: {
          AUTH00058487: 'ZamPredator',
          AUTH00058488: 'Predator',
        },
      },
    };

    expect(parsePostSelectedValues(sample)).toEqual([
      {
        parentKey: 'AUTP00006748',
        key: 'sudirRole',
        values: ['VPO-KIB-QS-U'],
      },
      {
        parentKey: 'AUTP00009749',
        key: 'project',
        values: ['MyBlocks'],
      },
      {
        parentKey: 'AUTP00009750',
        key: 'projectRole',
        values: ['ZamPredator', 'Predator'],
      },
    ]);
  });
});

describe('transformSelectedValues', () => {
  it('1 projectRole selected', () => {
    const sample = [
      {
        parentKey: 'AUTP00006748',
        key: 'sudirRole',
        values: ['VPO-KIB-QS-U'],
      },
      {
        parentKey: 'AUTP00009749',
        key: 'project',
        values: ['MyBlocks'],
      },
      {
        parentKey: 'AUTP00009750',
        key: 'projectRole',
        values: ['ZamPredator'],
      },
    ];

    expect(transformSelectedValues(sample)).toEqual([
      {
        sudirroles: 'VPO-KIB-QS-U',
        project: 'MyBlocks',
        projectroles: 'ZamPredator',
      },
    ]);
  });

  it('2 projectRoles selected', () => {
    const sample = [
      {
        parentKey: 'AUTP00006748',
        key: 'sudirRole',
        values: ['VPO-KIB-QS-U'],
      },
      {
        parentKey: 'AUTP00009749',
        key: 'project',
        values: ['MyBlocks'],
      },
      {
        parentKey: 'AUTP00009750',
        key: 'projectRole',
        values: ['ZamPredator', 'Predator'],
      },
    ];

    expect(transformSelectedValues(sample)).toEqual([
      {
        sudirroles: 'VPO-KIB-QS-U',
        project: 'MyBlocks',
        projectroles: 'ZamPredator',
      },
      {
        sudirroles: 'VPO-KIB-QS-U',
        project: 'MyBlocks',
        projectroles: 'Predator',
      },
    ]);
  });

  it('3 projectRoles selected', () => {
    const sample = [
      {
        parentKey: 'AUTP00006748',
        key: 'sudirRole',
        values: ['VPO-KIB-QS-U'],
      },
      {
        parentKey: 'AUTP00009749',
        key: 'project',
        values: ['MyBlocks'],
      },
      {
        parentKey: 'AUTP00009750',
        key: 'projectRole',
        values: ['ZamPredator', 'Predator', 'Alien'],
      },
    ];

    expect(transformSelectedValues(sample)).toEqual([
      {
        sudirroles: 'VPO-KIB-QS-U',
        project: 'MyBlocks',
        projectroles: 'ZamPredator',
      },
      {
        sudirroles: 'VPO-KIB-QS-U',
        project: 'MyBlocks',
        projectroles: 'Predator',
      },
      {
        sudirroles: 'VPO-KIB-QS-U',
        project: 'MyBlocks',
        projectroles: 'Alien',
      },
    ]);
  });
});
