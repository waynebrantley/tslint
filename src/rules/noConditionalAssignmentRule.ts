/*
 * Copyright 2015 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "assignment in conditional: ";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const walker = new NoConditionalAssignmentWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    }
}

class NoConditionalAssignmentWalker extends Lint.RuleWalker {
    private inConditionalExpression = false;

    protected visitIfStatement(node: ts.IfStatement) {
        this.checkExpressionForBinaryExpressions(node.expression);
        super.visitIfStatement(node);
    }

    protected visitWhileStatement(node: ts.WhileStatement) {
        this.checkExpressionForBinaryExpressions(node.expression);
        super.visitWhileStatement(node);
    }

    protected visitDoStatement(node: ts.DoStatement) {
        this.checkExpressionForBinaryExpressions(node.expression);
        super.visitWhileStatement(node);
    }

    protected visitForStatement(node: ts.ForStatement) {
        if (node.condition) {
            this.checkExpressionForBinaryExpressions(node.condition);
        }

        super.visitForStatement(node);
    }

    protected visitBinaryExpression(expression: ts.BinaryExpression) {
        if (this.inConditionalExpression) {
            this.checkBinaryExpressionForAssignment(expression);
        }
        super.visitBinaryExpression(expression);
    }

    private checkExpressionForBinaryExpressions(expression: ts.Expression) {
        this.inConditionalExpression = true;
        if (expression.kind === ts.SyntaxKind.BinaryExpression) {
            this.checkBinaryExpressionForAssignment(<ts.BinaryExpression> expression);
        }
        this.walkChildren(expression);
        this.inConditionalExpression = false;
    }

    private checkBinaryExpressionForAssignment(expression: ts.BinaryExpression) {
        if (this.isAssignmentToken(expression.operatorToken.kind)) {
            this.addFailure(this.createFailure(expression.getStart(), expression.getWidth(), Rule.FAILURE_STRING));
        }
    }

    private isAssignmentToken(token: ts.SyntaxKind): boolean {
        return token >= ts.SyntaxKind.FirstAssignment && token <= ts.SyntaxKind.LastAssignment;
    }

}
