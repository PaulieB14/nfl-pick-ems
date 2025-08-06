# Contributing to BaseApp Fees Subgraph

Thank you for your interest in contributing to the BaseApp Fees Subgraph! This document provides guidelines for contributing to this project.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `npm install`
4. **Make** your changes
5. **Test** your changes: `npm run build`
6. **Submit** a pull request

## 📋 Development Setup

### Prerequisites
- Node.js (v18 or higher)
- Graph CLI: `npm install -g @graphprotocol/graph-cli`

### Local Development
```bash
# Install dependencies
npm install

# Generate types from schema
npm run codegen

# Build the subgraph
npm run build

# Deploy locally (requires local graph-node)
npm run deploy-local
```

## 🏗️ Project Structure

```
├── abis/                    # Contract ABIs
├── src/
│   └── mapping.ts          # Event handlers
├── schema.graphql          # GraphQL schema
├── subgraph.yaml           # Subgraph manifest
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 📝 Code Style Guidelines

### TypeScript
- Use **TypeScript** for all mapping code
- Follow **AssemblyScript** best practices
- Use **strict typing** for all variables
- Add **JSDoc comments** for complex functions

### GraphQL Schema
- Use **descriptive field names**
- Include **field descriptions** with `@doc` directives
- Follow **Graph Protocol naming conventions**
- Use **appropriate data types** (Bytes, BigInt, etc.)

### Event Handlers
- **Handle all events** from tracked contracts
- **Validate data** before saving to entities
- **Use efficient ID generation** (concatI32 for Bytes)
- **Handle errors gracefully**

## 🧪 Testing

### Build Testing
```bash
# Test the build process
npm run build

# Check for TypeScript errors
npm run codegen
```

### Schema Validation
- Ensure all entities have **unique IDs**
- Verify **field types** match contract data
- Test **GraphQL queries** against schema

### Event Handler Testing
- Test **all event signatures**
- Verify **data mapping** is correct
- Check **entity relationships**

## 📊 Performance Guidelines

### Follow Graph Best Practices
- ✅ Use **timeseries entities** for raw data
- ✅ Implement **automatic aggregations**
- ✅ Mark entities as **immutable** when possible
- ✅ Use **Bytes as IDs** for better performance
- ✅ Avoid **eth_calls** during indexing
- ✅ Use **concatI32()** for ID generation

### Optimization Checklist
- [ ] **No eth_calls** in event handlers
- [ ] **Immutable entities** where appropriate
- [ ] **Efficient ID generation** (Bytes)
- [ ] **Proper indexing** on query fields
- [ ] **Optimized sorting** (timestamp-based)

## 🔧 Adding New Contracts

### 1. Add Contract ABI
```bash
# Add ABI to abis/ directory
cp contract-abi.json abis/ContractName.json
```

### 2. Update subgraph.yaml
```yaml
dataSources:
  - kind: ethereum
    name: ContractName
    network: base
    source:
      address: "0x..."
      abi: ContractName
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - NewEntity
      abis:
        - name: ContractName
          file: ./abis/ContractName.json
      eventHandlers:
        - event: EventName(indexed address,uint256)
          handler: handleEventName
      file: ./src/mapping.ts
```

### 3. Update Schema
```graphql
type NewEntity @entity(immutable: true) {
  id: Bytes!
  # Add fields based on event data
}
```

### 4. Add Event Handler
```typescript
export function handleEventName(event: EventNameEvent): void {
  let entity = new NewEntity(event.transaction.hash.concatI32(event.logIndex.toI32()))
  // Map event data to entity fields
  entity.save()
}
```

## 🐛 Bug Reports

### Before Submitting
1. **Search** existing issues
2. **Test** with latest version
3. **Reproduce** the issue locally

### Bug Report Template
```markdown
**Description**
Brief description of the issue

**Steps to Reproduce**
1. Deploy subgraph
2. Trigger specific event
3. Query for data
4. See error/incorrect data

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Graph CLI version:
- Node.js version:
- Network: Base
- Block range:

**Additional Context**
Any other relevant information
```

## 💡 Feature Requests

### Before Submitting
1. **Check** if feature already exists
2. **Research** Graph Protocol capabilities
3. **Consider** performance implications

### Feature Request Template
```markdown
**Feature Description**
Clear description of the new feature

**Use Case**
Why this feature is needed

**Proposed Implementation**
How you suggest implementing it

**Alternatives Considered**
Other approaches you've considered

**Additional Context**
Any other relevant information
```

## 📋 Pull Request Guidelines

### Before Submitting PR
- [ ] **Code builds** successfully
- [ ] **All tests pass**
- [ ] **Schema is valid**
- [ ] **Documentation updated**
- [ ] **Performance impact** considered

### PR Template
```markdown
**Description**
Brief description of changes

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Performance improvement
- [ ] Documentation update

**Testing**
- [ ] Local build successful
- [ ] Schema validation passed
- [ ] Event handlers tested

**Breaking Changes**
- [ ] Yes (describe changes)
- [ ] No

**Additional Notes**
Any other relevant information
```

## 🤝 Community Guidelines

### Code of Conduct
- **Be respectful** and inclusive
- **Help others** learn and grow
- **Provide constructive** feedback
- **Follow** project conventions

### Communication
- **Use clear language** in issues and PRs
- **Provide context** for problems
- **Ask questions** when unsure
- **Share knowledge** with the community

## 📚 Resources

- [Graph Protocol Documentation](https://thegraph.com/docs/)
- [AssemblyScript Guide](https://www.assemblyscript.org/)
- [GraphQL Schema Design](https://graphql.org/learn/schema/)
- [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)

## 🎯 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Graph Protocol Discord**: For Graph-specific questions
- **Base Community**: For Base chain questions

---

Thank you for contributing to the BaseApp Fees Subgraph! 🚀 