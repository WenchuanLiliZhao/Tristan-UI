import React, { useState } from 'react';
import { TimePicker } from '../../../design-system/ui-components/data-entry';

export const Element: React.FC = () => {
  const [basicStartDate, setBasicStartDate] = useState('');
  const [basicEndDate, setBasicEndDate] = useState('');
  
  const [controlledStartDate, setControlledStartDate] = useState('2024-01-15');
  const [controlledEndDate, setControlledEndDate] = useState('2024-03-20');
  
  const [validationStartDate, setValidationStartDate] = useState('');
  const [validationEndDate, setValidationEndDate] = useState('');
  const [validationError, setValidationError] = useState('');

  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [submittedData, setSubmittedData] = useState<{ start: string; end: string } | null>(null);

  const validateDateRange = (start: string, end: string) => {
    if (start && end && start > end) {
      setValidationError('开始日期必须早于结束日期');
    } else if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      
      if (diffDays > 365) {
        setValidationError('日期范围不能超过一年');
      } else {
        setValidationError('');
      }
    } else {
      setValidationError('');
    }
  };

  const handleValidationChange = (start: string, end: string) => {
    setValidationStartDate(start);
    setValidationEndDate(end);
    validateDateRange(start, end);
  };

  const handleFormSubmit = (start: string, end: string) => {
    if (start && end) {
      setSubmittedData({ start, end });
      console.log('Form submitted:', { start, end });
    } else {
      alert('请输入完整的日期范围');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>TimePicker 组件演示</h1>
      
      {/* Basic Usage */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>基础用法</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          基本的日期范围选择器，支持 YYYY-MM-DD 格式输入和自动聚焦
        </p>
        
        <TimePicker
          startDate={basicStartDate}
          endDate={basicEndDate}
          onStartDateChange={setBasicStartDate}
          onEndDateChange={setBasicEndDate}
          autoFocus
        />
        
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          backgroundColor: 'var(--color--bg-secondary)', 
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: 'var(--color--text-secondary)'
        }}>
          <strong>当前值:</strong><br />
          开始日期: {basicStartDate || '(未设置)'}<br />
          结束日期: {basicEndDate || '(未设置)'}
        </div>
      </section>

      {/* Controlled Component */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>受控组件</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          通过外部状态控制组件的值，支持程序化修改
        </p>
        
        <div style={{ marginBottom: '1rem' }}>
          <button 
            onClick={() => {
              setControlledStartDate('2024-01-01');
              setControlledEndDate('2024-12-31');
            }}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              backgroundColor: 'var(--color--semantic-active)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            设置为全年
          </button>
          <button 
            onClick={() => {
              setControlledStartDate('');
              setControlledEndDate('');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color--text-tertiary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            清空
          </button>
        </div>
        
        <TimePicker
          startDate={controlledStartDate}
          endDate={controlledEndDate}
          onStartDateChange={setControlledStartDate}
          onEndDateChange={setControlledEndDate}
          startDatePlaceholder="项目开始日期"
          endDatePlaceholder="项目结束日期"
        />
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>不同尺寸</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Tiny</h4>
            <TimePicker size="tiny" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Small</h4>
            <TimePicker size="small" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Medium (默认)</h4>
            <TimePicker size="medium" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Large</h4>
            <TimePicker size="large" />
          </div>
        </div>
      </section>

      {/* With Validation */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>带验证的日期选择器</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          演示如何为 TimePicker 添加自定义验证逻辑
        </p>
        
        <TimePicker
          startDate={validationStartDate}
          endDate={validationEndDate}
          onChange={handleValidationChange}
          startDatePlaceholder="项目开始"
          endDatePlaceholder="项目结束"
        />
        
        {validationError && (
          <div style={{ 
            marginTop: '0.5rem', 
            padding: '0.5rem', 
            backgroundColor: 'var(--color--semantic-error-pale)',
            color: 'var(--color--semantic-error)',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            ⚠️ {validationError}
          </div>
        )}
        
        {validationStartDate && validationEndDate && !validationError && (
          <div style={{ 
            marginTop: '0.5rem', 
            padding: '0.5rem', 
            backgroundColor: 'var(--color--semantic-success-pale)',
            color: 'var(--color--semantic-success)',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            ✅ 日期范围有效 ({Math.ceil((new Date(validationEndDate).getTime() - new Date(validationStartDate).getTime()) / (1000 * 3600 * 24))} 天)
          </div>
        )}
      </section>

      {/* Form Usage */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>表单中的使用</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          在表单中使用 TimePicker，支持 Enter 键提交
        </p>
        
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: 'var(--color--bg-secondary)', 
          borderRadius: '8px',
          border: '1px solid var(--color--border-prime)'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>创建新项目</h4>
          
          <TimePicker
            startDate={formStartDate}
            endDate={formEndDate}
            onStartDateChange={setFormStartDate}
            onEndDateChange={setFormEndDate}
            onEnter={handleFormSubmit}
            startDatePlaceholder="项目开始日期"
            endDatePlaceholder="项目结束日期"
          />
          
          <div style={{ 
            marginTop: '1rem',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <button 
              onClick={() => handleFormSubmit(formStartDate, formEndDate)}
              disabled={!formStartDate || !formEndDate}
              style={{
                padding: '8px 16px',
                backgroundColor: formStartDate && formEndDate ? 'var(--color--semantic-active)' : 'var(--color--text-tertiary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: formStartDate && formEndDate ? 'pointer' : 'not-allowed'
              }}
            >
              创建项目
            </button>
            <span style={{ fontSize: '0.9rem', color: 'var(--color--text-tertiary)' }}>
              或者在输入完成后按 Enter 键
            </span>
          </div>
        </div>
        
        {submittedData && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: 'var(--color--semantic-success-pale)',
            borderRadius: '6px',
            color: 'var(--color--semantic-success)'
          }}>
            <h5 style={{ margin: '0 0 0.5rem 0' }}>项目创建成功！</h5>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              项目周期: {submittedData.start} 至 {submittedData.end}
            </p>
          </div>
        )}
      </section>

      {/* Disabled State */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>禁用状态</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          演示禁用状态下的 TimePicker
        </p>
        
        <TimePicker
          disabled
          startDate="2024-01-01"
          endDate="2024-12-31"
          startDatePlaceholder="锁定的开始日期"
          endDatePlaceholder="锁定的结束日期"
        />
      </section>

      {/* Keyboard Navigation Guide */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>键盘导航指南</h2>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'var(--color--bg-tertiary)', 
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>键盘快捷键:</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color--text-secondary)' }}>
            <li><strong>Tab / 右箭头:</strong> 移动到下一个输入框</li>
            <li><strong>左箭头:</strong> 移动到上一个输入框</li>
            <li><strong>Enter:</strong> 完成当前日期并移动到下一个字段</li>
            <li><strong>自动聚焦:</strong> 输入完成后自动移动到下一个字段</li>
          </ul>
        </div>
      </section>

      {/* Date Validation */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>日期范围验证</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          演示内置的日期范围验证功能：当开始日期晚于结束日期时会自动弹出警告
        </p>
        
        <TimePicker
          onChange={(start, end) => {
            console.log('Validation demo - Date changed:', { start, end });
          }}
          startDatePlaceholder="输入较晚的日期"
          endDatePlaceholder="输入较早的日期"
        />
        
        <div style={{ 
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: 'var(--color--semantic-warning-pale)',
          borderRadius: '4px',
          fontSize: '0.85rem',
          color: 'var(--color--text-secondary)'
        }}>
          🧪 <strong>测试建议:</strong> 
          <br />• 开始日期：2024-12-31
          <br />• 结束日期：2024-01-01
          <br />输入完整后会触发警告提示
        </div>
      </section>

      {/* Auto Focus Behavior */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>自动聚焦行为演示</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          输入测试体验自动聚焦功能: YYYY (4位) → MM (2位) → DD (2位) → 下一个日期
        </p>
        
        <TimePicker
          autoFocus
          onChange={(start, end) => {
            console.log('Auto focus demo - Date changed:', { start, end });
          }}
          onEnter={(start, end) => {
            alert(`提交日期范围: ${start} 至 ${end}`);
          }}
          startDatePlaceholder="尝试快速输入"
          endDatePlaceholder="观察自动聚焦"
        />
        
        <div style={{ 
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: 'var(--color--semantic-info-pale)',
          borderRadius: '4px',
          fontSize: '0.85rem',
          color: 'var(--color--text-secondary)'
        }}>
          💡 <strong>提示:</strong> 尝试连续输入 "20240315" 观察组件如何自动分割并聚焦下一个字段
        </div>
      </section>
    </div>
  );
}; 