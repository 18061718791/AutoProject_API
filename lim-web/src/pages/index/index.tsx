import { getIndexStatistics } from '@/services/project';
import { Empty, Card, Col, Row, Skeleton, Tooltip, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { RingChart } from './statisticCharts';
import { InfoCircleOutlined } from '@ant-design/icons';
import { VERSION } from '@/utils/constant';
const EmptyComponents = () => (
  <div
    style={{
      height: 'calc(100vh - 430px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {' '}
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </div>
);
const Index: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getIndexStatistics().then((res) => {
      setData(res.results);
      setLoading(false);
    });
  }, []);

  const STATIC_MAP = [
    {
      name: '项目总数',
      countKey: 'project_count',
      newCountKey: 'project_new_count',
      tip: '平台中创建的项目数量汇总',
    },
    {
      name: '接口总数',
      countKey: 'api_count',
      newCountKey: 'api_new_count',
      tip: '所有项目接口库中的接口数量汇总',
    },
    {
      name: '用例总数',
      countKey: 'case_count',
      newCountKey: 'case_new_count',
      tip: '平台中所有的接口用例数量汇总',
    },
  ];
  return (
    <>
      <Row gutter={16} style={{ paddingTop: 8 }}>
        <Col span={18}>
          <Row gutter={16}>
            {STATIC_MAP.map((item) => (
              <Col span={8} key={item.countKey}>
                <Card style={{ backgroundColor: 'white', paddingBottom: 10 }}>
                  {loading ? (
                    <Skeleton paragraph={{ rows: 1 }} />
                  ) : (
                    <>
                      <div>
                        <span style={{ color: '#8C8C8C' }}>{item.name}</span>{' '}
                        <Tooltip title={item.tip}>
                          <InfoCircleOutlined
                            style={{ position: 'absolute', right: 16, fontSize: 16, color: '#8C8C8C' }}
                          />
                        </Tooltip>
                      </div>
                      <p style={{ fontSize: 36, marginBottom: 0, fontWeight: 'bold' }}>
                        {data[item.countKey]}
                      </p>
                      <span style={{ position: 'absolute', right: 16, fontSize: 12 }}>
                        较昨日新增：{data[item.newCountKey]}
                      </span>
                    </>
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={24} style={{ paddingTop: 16 }}>
            <Col span={12}>
              <Card
                title={
                  <p style={{ fontWeight: 'bold' }}>
                    各项目接口数量统计{' '}
                    <UnorderedListOutlined
                      style={{ position: 'absolute', right: 24, top: 20, fontSize: 24 }}
                    />
                  </p>
                }
                bordered={false}
              >
                {loading ? (
                  <Skeleton paragraph={{ rows: 7 }} />
                ) : data.api_data.length ? (
                  <RingChart
                    data={data.api_data}
                    content="接口统计"
                    color={{
                      color: ['#657798', '#F6C022', '#62DAAB', '#7666F9', '#74CBED', '#6395F9'],
                    }}
                  />
                ) : (
                  <EmptyComponents />
                )}
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <p style={{ fontWeight: 'bold' }}>
                    各用户用例数量统计{' '}
                    <UnorderedListOutlined
                      style={{ position: 'absolute', right: 24, top: 20, fontSize: 24 }}
                    />
                  </p>
                }
                bordered={false}
              >
                {loading ? (
                  <Skeleton paragraph={{ rows: 7 }} />
                ) : data.case_data.length ? (
                  <RingChart data={data.case_data} content="用例统计" />
                ) : (
                  <EmptyComponents />
                )}
              </Card>
            </Col>
          </Row>
          {/* <Row gutter={24} style={{ paddingTop: 16 }}>
            <Col span={24}>
              <Card
                title={
                  <p style={{ fontWeight: 'bold' }}>
                    接口使用频次统计{' '}
                    <UnorderedListOutlined
                      style={{ position: 'absolute', right: 24, top: 20, fontSize: 24 }}
                    />
                  </p>
                }
                bordered={false}
              >
                {loading ? (
                  <Skeleton paragraph={{ rows: 7 }} />
                ) : data.api_data.length ? (
                  <DemoColumn
                    data={data.api_data}
                    content="接口统计"
                    color={{
                      color: ['#657798', '#F6C022', '#62DAAB', '#7666F9', '#74CBED', '#6395F9'],
                    }}
                  />
                ) : (
                  <EmptyComponents />
                )}
              </Card>
            </Col>
          </Row> */}
        </Col>
        
      </Row>
      
    </>
  );
};

export default Index;
