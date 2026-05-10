# Contributing to AquaGrid

Thank you for your interest in contributing to AquaGrid!

## Development Setup

1. **Fork and Clone**
```bash
git clone https://github.com/your-username/aquagrid.git
cd aquagrid
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create Environment File**
```bash
cp .env.example .env
```

4. **Start Development Server**
```bash
npm run dev
```

## Code Standards

### Style Guide
- Use functional components with hooks
- Follow existing code structure
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

### File Organization
```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── services/       # API and external services
├── utils/          # Utility functions
└── __tests__/      # Test files
```

### Naming Conventions
- Components: PascalCase (e.g., `PumpTwin.jsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useApi.js`)
- Utilities: camelCase (e.g., `helpers.js`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE`)

## Git Workflow

### Branch Naming
- Feature: `feature/description`
- Bug fix: `fix/description`
- Hotfix: `hotfix/description`
- Documentation: `docs/description`

### Commit Messages
Follow conventional commits:
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

### Pull Request Process

1. **Create Feature Branch**
```bash
git checkout -b feature/your-feature
```

2. **Make Changes**
- Write clean, documented code
- Add tests for new features
- Update documentation

3. **Test Your Changes**
```bash
npm run lint
npm test
npm run build
```

4. **Commit Changes**
```bash
git add .
git commit -m "feat: your feature description"
```

5. **Push and Create PR**
```bash
git push origin feature/your-feature
```

6. **PR Checklist**
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Accessibility checked
- [ ] Mobile responsive

## Testing

### Writing Tests
```javascript
import { describe, it, expect } from 'vitest';

describe('Component', () => {
  it('should render correctly', () => {
    // Test implementation
  });
});
```

### Running Tests
```bash
npm test              # Run tests
npm run test:ui       # Run with UI
npm run test:coverage # Generate coverage
```

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

## Performance

- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Implement code splitting
- Optimize images
- Use proper React keys

## Documentation

- Update README for new features
- Add JSDoc comments for functions
- Document complex algorithms
- Update CHANGELOG

## Code Review

All submissions require review. We use GitHub pull requests for this purpose.

### Review Criteria
- Code quality and readability
- Test coverage
- Performance impact
- Accessibility compliance
- Documentation completeness

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

## License

By contributing, you agree that your contributions will be licensed under the project's license.
